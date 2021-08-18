
const router = require('express').Router();
const Workout = require("../models/workout");

router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
        $addFields: {
            totalDuration: {
                $sum: "$exercises.duration",
            },
        },
    },])
        .then((workout) => {
            res.json(workout);
        })
        .catch((err) => {
            res.json(err);
        });
});
router.post("/api/workouts", (req, res) => {
    Workout.create(req.body)
        .then((workout) => {
            res.json(workout);
        })
        .catch((err) => {
            res.json(err);
        });
    router.put("/api/workouts/:id", ({ params, body }, res) => {
        Workout.findOneAndUpdate({ _id: params.id }, { $push: { exercises: body } }, { new: true })
            .then((workout) => {
                res.json(workout);
            })
            .catch((err) => {
                res.json(err);
            });
    });

    // get workout range (limit to seven days)
    router.get("/api/workouts/range", (req, res) => {
        Workout.aggregate([{
            $addFields: {
                totalDuration: {
                    $sum: "$exercises.duration",
                },
            },
        },])
            .sort({ _id: -1 })
            .limit(7)
            .then((workout) => {
                console.log(workout);
                res.json(workout);
            })
            .catch((err) => {
                res.json(err);
            });
    });

});

module.exports = router;