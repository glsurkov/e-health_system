/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {type Contract} from 'fabric-contract-api';
import {MedicalRecordContract} from './MedicalRecordContract-iterators-final';

export const contracts: typeof Contract[] = [MedicalRecordContract];
