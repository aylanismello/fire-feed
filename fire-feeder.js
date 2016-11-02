"use strict";
import models from './models/index';
import Updater from './updater';
import SC from 'node-soundcloud';
import request from 'request';
import fs from 'fs';
import {exec} from 'child_process';
import async from 'async';
require('dotenv').config();



class FireFeeder {

  constructor() {
    console.log('beginning FireFeeder');
  }

  getUser(userId, cb) {

    const url = `http://api.soundcloud.com/users/${userId}?client_id=${process.env.SOUNDCLOUD_CLIENT}`;

    request(url, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let userObj = JSON.parse(body);

        cb(userObj);

      } else {
        console.log(`error getting user is ${error}! status code is ${response.statusCode}`);
        return null;
      }
    });

  }




  addPublisherToDB(userId, track, track_type) {

    const makePublisher = (userObj) => {
      console.log(`publisher don't exist. creating with ${userObj.id}`);

      let newPublisher = models.Publisher.build({
        name: userObj.username,
        soundcloud_id: userObj.id,
        country: userObj.country,
        city: userObj.city,
        permalink_url: userObj.permalink_url,
        avatar_url: userObj.avatar_url,
        track_count: userObj.track_count,
        followers_count: userObj.followers_count,
        followings_count: userObj.followings_count
      });

      newPublisher.save()
        .then(createdPublisher => {

          console.log(`created ${createdPublisher}`);
          console.log(`now trying to create track`);

          let newTrack = models.Track.build({
            name: track.title,
            soundcloud_id: track.id,
            artwork_url: track.artwork_url,
            created_at_external: new Date(track.created_at),
            CuratorId: 1,
            PublisherId: createdPublisher.id,
            duration: track.duration,
            track_type,
            playback_count: track.playback_count,
            likes_count: track.likes_count,
            purchase_url: track.purchase_url,
            permalink_url: track.permalink_url
          });

          newTrack.save()
            .then(() => console.log('succeeded in making track!'))
            .catch(err => {
              console.log(`messed up creating track. ${err}`);
            });


        })
        .catch(err => {
          console.log(`messed up creating publisher. ${err}`);
        });
    };

    this.getUser(userId, makePublisher);

  }

  addTrackToDB(track, publisherId) {

  }

  createTrackAndStuff(trackObj, curatorId) {
    if (trackObj.type.includes('playlist') || !trackObj.track.streamable)
      return;

    let track = trackObj.track;
    let user = track.user;
    // 10 minutes in milliseconds
    let maxSongDur = 10 * 60 * 1000;


    const track_type = Math.ceil(track.duration) < maxSongDur ? "song" : "mix";

    // we need to create a new user if it does not already exist in database
    // under where: soundcloud_id: user.id

    // we also need to only create a new track if it does not already exist in database
    // under where: soundcloud_id: track.id


    console.log(`gonna add ${track.title}`);

    models.Publisher.findOne({where: {soundcloud_id: user.id}})
      .then(existingPublisher => {
        if(existingPublisher) {
          // console.log('publisher already exists. dope');


        } else { //PUBLISHER DOES NOT EXIST

          this.addPublisherToDB(user.id, track, track_type);
          // this.getUser(user.id, makePublisher);

        }
      });

    /*
    models.Track.findOne({where: {soundcloud_id: track.id}})
    .then(existingTrack => {
      // CREATE NEW TRACK
      if(!existingTrack) {
        const newTrack = models.Track.build({
          name: track.title,
          soundcloud_id: track.id,
          artwork_url: track.artwork_url,
          created_at_external: new Date(track.created_at),
          CuratorId: curatorId,
          duration: track.duration,
          track_type,
          playback_count: track.playback_count,
          likes_count: track.likes_count,
          purchase_url: track.purchase_url,
          permalink_url: track.permalink_url,
          username: user.username,
          user_avatar_url: user.avatar_url,
          user_country_code: user.country_code,
          user_city: user.city
        });

        if (track.likes_count) {
          newTrack.save()
          .then(createdTrack => {
            console.log('successfully created new Track!');
            return createdTrack;
          })
          .catch(err => {
            console.log(`error saving track: ${err}`);
          });
        } else {
          console.log('error in track creation, undefined something');
        }


        // DO NOT CREATE NEW TRACK, SIMPLY ADD THIS CURATOR TO LIST OF TRACK'S CURATORS
      } else {
        console.log(`add this curator to list of this track's curators then!`);
        return existingTrack;
      }


    })
    .then(theTrack => {
      console.log(`did something with ${theTrack}!`);
    });*/


  }

  updateTracks(url, userId)  {

    request(url, (error, response, body) => {

      if (!error && response.statusCode === 200) {
        let sdObj = JSON.parse(body);

        // actually create all tracks in database
        sdObj.collection.forEach(track => this.createTrackAndStuff(track, userId));
        // next_href is the link to continue to paginate.
        // so we will continue to send a GET request to this url
        // as long as it is non-null
        url = sdObj.next_href;

        if(url) {
          url = `${url}&client_id=${process.env.SOUNDCLOUD_CLIENT}`;
          this.updateTracks(url, userId);
        }

      } else {
        console.log(`error updating track: ${error}!
            status code: ${response.statusCode}`);
        console.log(`body was ${body}`);
        console.log(`last url was ${url}`);
      }
    });

  }


  initTracks() {
    models.Curator.findAll({})
      .then(curators => {
        console.log('got all curators from database.');
        curators.forEach(curator => {
            let sdId = curator.dataValues.soundcloud_id;
            let userId = curator.dataValues.id;

            console.log('beginning to iterate through tracks');
            this.updateTracks(`https://api-v2.soundcloud.com/profile/soundcloud:users:${sdId}?limit=50&offset=0&client_id=${process.env.SOUNDCLOUD_CLIENT}`,
              userId);
        });
      });
  }


  curatorNameToId(name, finishedCB) {
    exec(`ruby soundcloud.rb ${name}`, (error, stdout, stderr) => {

  		let id = parseInt(stdout);


  		if (id !== id) {
  			console.log(`did not receive valid id from search API for ${name}`);
  		} else {
        this.addCuratorToDB({name, soundcloud_id: id}, finishedCB);
        // cb();

  		}
  	});
  }




  addCuratorToDB(curator, finishedCB) {

    models.Curator.findOne({where: {soundcloud_id: curator.soundcloud_id}})
      .then(isCurator => {
        if (!isCurator) {

          this.getUser(curator.soundcloud_id, userObj => {

            let newCurator = models.Curator.build({
              name: userObj.username,
              soundcloud_id: userObj.id,
              country: userObj.country,
              city: userObj.city,
              permalink_url: userObj.permalink_url,
              avatar_url: userObj.avatar_url,
              track_count: userObj.track_count,
              followers_count: userObj.followers_count,
              followings_count: userObj.followings_count
            });

            newCurator.save()
              .then(createdCurator => {
                console.log(`created ${createdCurator.name}`);
                finishedCB();
              })
              .catch(err => {
                console.log(`error creating new curator: ${err}`);
                finishedCB();
              });

          });

        } else { // else, we're done here.
          finishedCB();
        }



      });

  }

  initCurators() {
    this.curatorsJson = JSON.parse(fs.readFileSync('curators.json'), 'utf8');
    this.terminalCount = this.curatorsJson.labels.length;
    this.curatorCount = 0;

    // this.curatorsJson.labels.forEach(label => {
    //   this.curatorNameToId(label, this.addCuratorToDB.bind(this));
    // });

  }

  asyncFun() {

    let {labels} = JSON.parse(fs.readFileSync('curators.json'), 'utf8');

    async.forEach(labels, (label, finishedCB) => {
                                // this finsihedCB is invoked whenever the anychornous function we run is over
      console.log(label);
      this.curatorNameToId(label, finishedCB);

    }, (err) => {
      if(err) return console.log(err);
      console.log('finished with all shit');

    });

  }



}

const feeder = new FireFeeder();
feeder.asyncFun();
// feeder.initTracks();
// feeder.initCurators();
