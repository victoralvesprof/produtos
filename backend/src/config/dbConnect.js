import mongoose from "mongoose";

mongoose.connect("mongodb+srv://vhcalves:Root_1234@cluster0.6rxw4tp.mongodb.net/martins-produtos");

const db = mongoose.connection;

export default db;
