'use strict';

const { v4: uuidv4 } = require('uuid');

module.exports.info = 'Submit CreateRecord transaction';

module.exports.init = async function () {};

module.exports.run = async function (context, args) {
    const recordId = uuidv4();
    const patientId = `patient-${Math.floor(Math.random() * 1000)}`;
    const doctorId = `doctor-${Math.floor(Math.random() * 1000)}`;
    const dataHash = `hash-${recordId}`;

    const txArgs = [patientId, doctorId, dataHash];

    return context.contract.submitTransaction('CreateRecord', ...txArgs);
};

module.exports.end = async function () {};
