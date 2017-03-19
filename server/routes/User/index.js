import express from 'express';

export const userRoutes = model => {
  const router = express.Router();

  router.route('/')
    .get((req, res) => {
      model.find((err, user) => {
        res.json(user);
      });
    })

    .post((req, res) => {
      model.find({ login: req.body.login }, (err, user) => {

        // check if user is already created
        try {
          if(user.length !== 0) {
            res.json({
              success: false,
              message: 'Email address already in use'
            });

          } else {
            const user = new model(req.body);
            user.save(err => {
              if(!err) {
                res.json({
                  success: true,
                  message: 'User successfully created',
                  user
                });
              } else {
                res.json({
                  success: false,
                  message: 'User not created',
                  err
                });
              }
            });
          }
        } catch (err) {
          console.log('user creating server err', err);
        }
      });
    });

  router.route('/:user_id')
    .get((req, res) => {
      model.findById(req.params.user_id, (err, user) => {
        !err ? res.json(user) : res.json(err);
      });
    })

    .delete((req, res) => {
      model.remove({
        _id: req.params.user_id
      }, () => { res.json({message: 'User deleted' });
      })
    });

  return router;
};