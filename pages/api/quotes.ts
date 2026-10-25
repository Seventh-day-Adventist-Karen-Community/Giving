import { NextApiRequest, NextApiResponse } from "next";
import { FetchQuotes } from "../../data/quotes";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const data = await FetchQuotes()
    res.status(200).json(data)
  }
