const mongoose = require("mongoose");
const slugify = require("slugify");

const geoCoder = require("../utils/geocoder");

const BootcampSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      unique: true,
      trim: true,
      maxlength: [50, "Name can not be more than 50 characters"]
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
      maxlength: [500, "Name can not be more than 50 characters"]
    },
    website: {
      type: String,
      match: [
        /(https?:\/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
        "Please use a valid URL"
      ]
    },
    email: {
      type: String,
      match: [
        /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,
        "Please add a valid email"
      ]
    },
    address: {
      type: String,
      required: [true, "Please add an address"]
    },
    location: {
      //   GeoJSON Point
      type: { String, emum: ["Point"], required: true },
      coordinates: {
        type: [Number],
        required: true,
        index: "2dsphere"
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String
    },
    careers: {
      type: [String],
      required: true,
      enum: [
        "Web Development",
        "Mobile Development",
        "UI/UX",
        "Data Science",
        "Business",
        "Others"
      ]
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be at least 1"],
      max: [10, "Rating must not be more than 10"]
    },
    averageCost: Number,
    photo: { type: String, default: "no-photo.jpg" },
    housing: { type: Boolean, default: false },
    jobAssistance: { type: Boolean, default: false },
    jobGuarantee: { type: Boolean, default: false },
    acceptGi: { type: Boolean, default: false },
    createdAt: {
      type: Date,
      default: Date.now
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      requried: true
    }
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Create slug from the name
BootcampSchema.pre("save", function() {
  console.log("Slugify ran", this.name);
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Geocode & create location field
// https://www.npmjs.com/package/node-geocoder
BootcampSchema.pre("save", async function(next) {
  // Get the address from input
  const loc = await geoCoder.geocode(this.address);
  // set the location
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].country
  };

  next();
});

// Reverse populate with virtuals, useful to populate an array of fields
BootcampSchema.virtual("courses", {
  ref: "Course",
  localField: "_id",
  foreignField: "bootcamp",
  justOne: false
});

// Cascade delete course when a bootcamp is deleted
BootcampSchema.pre("remove", async function(next) {
  console.log(`Courses being removed from bootcamp ${this._id}`);
  await this.model("Course").deleteMany({ bootcamps: this._id });
  next();
});

module.exports = mongoose.model("Bootcamp", BootcampSchema);
