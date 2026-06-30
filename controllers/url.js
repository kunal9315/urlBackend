import Url from "../models/url.js";
import User from "../models/user.model.js";
import { nanoid } from "nanoid";

export async function createShortUrl(req, res) {
  let { longUrls } = req.body;
  let user = req.user; 

  if (!longUrls) {
    return res.status(400).send({ success: false, message: "url missing" });
  }

  let urlRegex =
    /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

  if (!/^https?:\/\//i.test(longUrls)) {
    longUrls = `https://${longUrls}`;
  }

  if (!urlRegex.test(longUrls)) {
    return res
      .status(400)
      .send({ success: false, message: "Invalid URL format" });
  }

  const code = nanoid(8);

  try {
    let url = await Url.create({
      shortUrl: code,
      longUrl: longUrls,
      clicks: 0,
    });

    if (user) {
      await User.findOneAndUpdate(
        { email: user.email },
        {
          $push: { myUrls: url._id },
        },
      );
    }

    res
      .status(201)
      .json({ success: true, "shortUrl": url.shortUrl, "longUrl": url.longUrl, "clicks": url.clicks ,"createdAt": url.createdAt});
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create short URL" });
  }
}

export async function redirectToLongUrl(req, res) {
  const { code } = req.params;

  try {
    const url = await Url.findOneAndUpdate(
      { shortUrl: code },
      { $inc: { clicks: 1 } },
      { new: true },
    );

    if (!url) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    res.status(200).json({ success: true, longUrl: url.longUrl });
  } catch (err) {
    res.status(500).json({ error: "Failed to redirect" });
  }
}

export const getAll = async (req, res) => {

  let user = req.user;

  if (!user) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    
    const allUrl = await User.findOne({email: user.email}).populate({path:"myUrls",select:"shortUrl longUrl clicks createdAt -_id"});

    res.status(200).json({success: true, allUrl: allUrl.myUrls});
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch analytics" });
  }
};
