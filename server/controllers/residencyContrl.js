import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";
//function to uploud data to DB
export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    images,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        images,
        owner : {connect : {email: userEmail}},
      },
    });

    res.send({message: "Residency created successfully",residency})
  } catch (err) {
    if (err.code === "P2002") {
      return res.status(400).send({
        message: "A residency with the provided address already exists."
      });
    }
}});
//function to get all the docs from DB
export  const getAllResidencies = asyncHandler(async(req,res) =>{
   try{ 
    const residencies = await prisma.residency.findMany({
        orderBy:{
            createdAt: "desc"
        },
    });
    res.send(residencies)
  } catch (err){
    throw new Error(err.message);
  }
});

//function to get one doc from DB

export const getResidency= asyncHandler(async (req,res) => {
    const {id} = req.params;

    try{

        const residency = await prisma.residency.findUnique({
            where: {id}
        })
        res.send(residency)

    }catch(err){
        throw new  Error(err.message)
    }
})