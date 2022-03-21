import clientPromise from "../../lib/mongodb";

async function getUsers(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("meshmill-test");
    let users = await db
      .collection("users")
      .find({})
      .sort({ published: -1 })
      .toArray();
    return res.json({
      message: JSON.parse(JSON.stringify(users)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function addOrUpdateUser(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("meshmill-test");
    let reqJson = JSON.parse(req.body);
    const query = { name: reqJson.name };
    const update = {
      $set: { name: reqJson.name, sessionId: reqJson.sessionId },
    };
    const options = { upsert: true };
    await db.collection("users").updateOne(query, update, options);
    // return a message
    return res.json({
      message: "User updated successfully",
      payload: reqJson,
      success: true,
    });
  } catch (error) {
    // return an error
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

export default function handler(req, res) {
  switch (req.method) {
    case "GET": {
      return getUsers(req, res);
    }
    case "POST": {
      return addOrUpdateUser(req, res);
    }
  }
}
