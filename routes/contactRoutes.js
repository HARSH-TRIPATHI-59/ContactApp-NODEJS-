const express =require("express");
const router = express.Router();
const {getContact, postContacts,getId,putId,deleteId} = require("../controllers/contactController");
const validateToken = require("../middleware/validateToken");

router.use(validateToken);
router.route("/").get(getContact).post(postContacts);
router.route("/:id").get(getId).put(putId).delete(deleteId);



module.exports = router