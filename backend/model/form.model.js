const { Schema, model } = require("mongoose");

const formSchema = new Schema({
  name: { type: String, required: true },
  email: {type: String,required: true,},
  destination: {type: String,required: true,},
  travelors: {type: Number,required: true,},
  budget: {type: Number,required: true,},
  per_person: {type: Number,required: true,}
});

const formModel = model("form", formSchema);

module.exports = formModel;