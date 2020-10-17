router.patch("/follow/:id", authenticate, async (req, res) => {
  try {
    const id = new ObjectID(req.params.id);

    // check if the id is a valid one
    if (!ObjectID.isValid(req.params.id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }

    // check if your id doesn't match the id of the user you want to follow
    if (res.user._id === req.params.id) {
      return res.status(400).json({ error: "You cannot follow yourself" });
    } // add the id of the user you want to follow in following array
    const query = {
      _id: res.user._id,
      following: { $not: { $elemMatch: { $eq: id } } },
    };

    const update = {
      $addToSet: { following: id },
    };

    const updated = await User.updateOne(query, update);

    // add your id to the followers array of the user you want to follow
    const secondQuery = {
      _id: id,
      followers: { $not: { $elemMatch: { $eq: res.user._id } } },
    };

    const secondUpdate = {
      $addToSet: { followers: res.user._id },
    };

    const secondUpdated = await User.updateOne(secondQuery, secondUpdate);

    if (!updated || !secondUpdated) {
      return res.status(404).json({ error: "Unable to follow that user" });
    }

    res.status(200).json(update);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

router.patch("/unfollow/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;

    // check if the id is a valid one
    if (!ObjectID.isValid(id)) {
      return res.status(404).json({ error: "Invalid ID" });
    }

    // check if your id doesn't match the id of the user you want to unfollow
    if (res.user._id === id) {
      return res.status(400).json({ error: "You cannot unfollow yourself" });
    }

    // remove the id of the user you want to unfollow from following array
    const query = {
      _id: res.user._id,
      following: { $elemMatch: { $eq: id } },
    };

    const update = {
      $pull: { following: id },
    };

    const updated = await User.updateOne(query, update);

    // remove your id from the followers array of the user you want to unfollow
    const secondQuery = {
      _id: id,
      followers: { $elemMatch: { $eq: res.user._id } },
    };

    const secondUpdate = {
      $pull: { followers: res.user._id },
    };

    const secondUpdated = await User.updateOne(secondQuery, secondUpdate);

    if (!updated || !secondUpdated) {
      return res.status(404).json({ error: "Unable to unfollow that user" });
    }

    res.status(200).json(update);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});
