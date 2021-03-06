/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const mongoose = require('mongoose');

const dailySchema = new mongoose.Schema({
    ownerId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    mapURL: { type: String },
    type: { type: Number, required: true },
    steps: { type: Array, required: true },
    publicDaily: { type: Boolean, default: false },
    visWaxDaily: { type: Boolean },
    nemiDaily: { type: Boolean }
});

dailySchema.set('toJSON', { virtuals: true });
const Daily = mongoose.model('Daily', dailySchema, 'dailys');

module.exports = { Daily }