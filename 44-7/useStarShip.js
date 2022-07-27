const StarshipEnterprise = require("./StarshipEnterprise");

const militaryAssignments = new StarshipEnterprise();
militaryAssignments.assignOfficer(10, "Captain Picard");
militaryAssignments.assignOfficer(6, "Commander Riker");
militaryAssignments.assignOfficer(11, "Commander Data");
militaryAssignments.assignOfficer(4, "Lt. Cmdr. Worf");
militaryAssignments.assignOfficer(7, "Lt. Cmdr. LaForge");
militaryAssignments.assignOfficer(12, "Lt. Cmdr. Crusher");
militaryAssignments.assignOfficer(5, "Lieutenant Security-Officer");
militaryAssignments.assignOfficer(13, "Lieutenant Selar");

// const officers = militaryAssignments.findOfficersWithNoDirectReports();
// console.log(officers);

const officers2 = militaryAssignments.listOfficersByRank(militaryAssignments);
console.log(officers2);

// Rank 1:                  10 Captain Picard
//                         /                  \
// Rank 2:        6 Commander Riker       11 Commander Data
//                    /         \               \
// Rank 3:       4 Lt. Cmdr.   7 Lt. Cmdr.     12 Lt. Cmdr.
//                Worf           LaForge           Crusher
//                     \                           \
// Rank 4:        5 Lieutenant                  13 Lieutenant
//               security-officer                    Selar
