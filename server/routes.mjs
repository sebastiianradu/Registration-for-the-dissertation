import express from "express";

import {  Student,Professor,Session,Application } from "./repository.mjs";

import{
    getRecords, postRecord,getRecord,putRecord,deleteRecords,headRecord,deleteRecord,patchRecord
} from './service.mjs';


const router = express.Router();

///////// RUTE STUDENTI ////////
router.route('/students')
    .get((req, res) => getRecords(Student, req, res))
    .post((req, res) => postRecord(Student, req, res))
    .delete((req, res) => deleteRecords(Student, req, res));

router.route('/students/:id')
    .get((req, res) => getRecord(Student, req, res))
    .head((req, res) => headRecord(Student, req, res))
    .put((req, res) => putRecord(Student, req, res))
    .patch((req, res) => patchRecord(Student, req, res))
    .delete((req, res) => deleteRecord(Student, req, res));

//////////// RUTE PROFESORI //////////    

router.route('/professors')
    .get((req, res) => getRecords(Professor, req, res))
    .post((req, res) => postRecord(Professor, req, res))
    .delete((req, res) => deleteRecords(Professor, req, res));

router.route('/professors/:id')
    .get((req, res) => getRecord(Professor, req, res))
    .head((req, res) => headRecord(Professor, req, res))
    .put((req, res) => putRecord(Professor, req, res))
    .patch((req, res) => patchRecord(Professor, req, res))
    .delete((req, res) => deleteRecord(Professor, req, res));    

/////////// RUTE SESIUNI ////////////////
router.route('/sessions')
    .get((req, res) => getRecords(Session, req, res))
    .post((req, res) => postRecord(Session, req, res))
    .delete((req, res) => deleteRecords(Session, req, res));

router.route('/sessions/:id')
    .get((req, res) => getRecord(Session, req, res))
    .head((req, res) => headRecord(Session, req, res))
    .put((req, res) => putRecord(Session, req, res))
    .patch((req, res) => patchRecord(Session, req, res))
    .delete((req, res) => deleteRecord(Session, req, res));  
    
    /////////////// RUTE APLICATII //////////////
router.route('/applications')
    .get((req, res) => getRecords(Application, req, res))
    .post((req, res) => postRecord(Application, req, res))
    .delete((req, res) => deleteRecords(Application, req, res));

router.route('/applications/:id')
    .get((req, res) => getRecord(Application, req, res))
    .head((req, res) => headRecord(Application, req, res))
    .put((req, res) => putRecord(Application, req, res))
    .patch((req, res) => patchRecord(Application, req, res))
    .delete((req, res) => deleteRecord(Application, req, res));   
    
    
export default router;