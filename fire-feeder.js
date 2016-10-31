"use strict";
import models from './models/index';
import Updater from './updater';
import SC from 'node-soundcloud';
import request from 'request';
import fs from 'fs';
require('dotenv').config();


const update = new Updater();

let trackCount = 0;

const addTrack = (trackObj, curatorId) => {

  if (trackObj.type.includes('playlist') || !trackObj.track.streamable)
    return;

  trackCount++;
  let track = trackObj.track;
  let user = track.user;
  // 10 minutes in milliseconds
  let maxSongDur = 10 * 60 * 1000;


  const track_type = Math.ceil(track.duration) < maxSongDur ? "song" : "mix";



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
      .catch(err => {
        console.log(`error saving track: ${err}`);
        process.exit();

      });
  }

};




const updateTracks = (url, userId) => {
  request(url, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      let sdObj = JSON.parse(body);

      sdObj.collection.forEach(track => {
        addTrack(track, userId);
      });

      url = sdObj.next_href;

      if(url) {
        url = `${url}&client_id=${process.env.SOUNDCLOUD_CLIENT}`;
        updateTracks(url, userId);
      }

    } else {
      console.log(`error updating track is ${error}! status code is ${response.statusCode}`);
      console.log(`body was ${body}`);
      console.log(`last url was ${url}`);
    }
  });

};

const getUser = (userId, cb) => {

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

};


//
models.Curator.findAll({})
  .then(curators => {
    curators.forEach(curator => {
        let sdId = curator.dataValues.soundcloud_id;
        let userId = curator.dataValues.id;


        updateTracks(`https://api-v2.soundcloud.com/profile/soundcloud:users:${sdId}?limit=50&offset=0&client_id=${process.env.SOUNDCLOUD_CLIENT}`,
          userId);




    });
  });



//


// models.Curator.findAll({})
//   .then(curators => {
//     curators.forEach(curator => {
//         // console.log(curator.dataValues.soundcloud_id);
//         let id = curator.dataValues.soundcloud_id;
//
//         SC.get(`/users/${id}/tracks`, function(err, tracks) {
//           if ( err ) {
//             throw err;
//           } else {
//             console.log(`tracks from ${id} is ${tracks}`);
//           }
//         });
//
//     });
//   });


//
// let curatorCount = 0;
// const curatorsJson = JSON.parse(fs.readFileSync('curators.json'), 'utf8');
// const terminalCount = curatorsJson.labels.length;
//
//
//
// update.getSoundcloudIds(curators => {
//
//   curators.forEach(curator => {
//
//     models.Curator.findOne({where: {soundcloud_id: curator.soundcloud_id}})
//       .then(isCurator => {
//         curatorCount++;
//         if (!isCurator) {
//
//           getUser(curator.soundcloud_id, userObj => {
//
//
//             let newCurator = models.Curator.build({
//               name: userObj.username,
//               soundcloud_id: userObj.id,
//               country: userObj.country,
//               city: userObj.city,
//               permalink_url: userObj.permalink_url,
//               avatar_url: userObj.avatar_url,
//               track_count: userObj.track_count,
//               followers_count: userObj.followers_count,
//               followings_count: userObj.followings_count
//             });
//
//             newCurator.save()
//               .catch(err => {
//                 console.log(`error creating new curator: ${err}`);
//
//               });
//
//           });
//
//         }
//
//         if(curatorCount === terminalCount) {
//           console.log('deuces!');
//         }
//
//       });
//
//
//
//   });
// });
