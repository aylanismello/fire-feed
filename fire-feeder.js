import models from './models/index';
import Updater from './updater';
import SC from 'node-soundcloud';

const update = new Updater();

//
models.Curator.findAll({})
  .then(curators => {
    curators.forEach(curator => {
        // console.log(curator.dataValues.soundcloud_id);
        let id = curator.dataValues.soundcloud_id;

        SC.get(`/users/${id}/tracks`, function(err, tracks) {
          if ( err ) {
            throw err;
          } else {
            console.log(`tracks from ${id} is ${tracks}`);
          }
        });

    });
  });

//
// update.getSoundcloudIds(curators => {
//   console.log(`${curators} is the shit`);
//
//   curators.forEach(curator => {
//
//     models.Curator.findOne({where: {soundcloud_id: curator.soundcloud_id}})
//       .then(isCurator => {
//         if (!isCurator) {
//           console.log('creating new curator');
//           models.Curator.create({
//             title: curator.name,
//             soundcloud_id: curator.soundcloud_id
//           })
//           .then(createdCurator => {
//             console.log(createdCurator);
//           });
//
//         }
//       });
//
//
//
//   });
// });
