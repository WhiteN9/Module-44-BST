const Queue = require("./Queue");

class StarshipEnterprise {
  constructor(officerId = null, officerName = null, reportTo = null) {
    this.officerId = officerId; //key
    this.officerName = officerName; //value
    this.reportTo = reportTo; // the officer that the new officer reports to, parent
    this.leftReport = null; //left child
    this.rightReport = null; //right child
  }

  assignOfficer(officerId, officerName) {
    if (this.officerId === null) {
      this.officerId = officerId;
      this.officerName = officerName;
    } else if (officerId < this.officerId) {
      if (this.leftReport === null) {
        this.leftReport = new StarshipEnterprise(officerId, officerName, this);
      } else {
        this.leftReport.assignOfficer(officerId, officerName);
      }
    } else if (officerId > this.officerId) {
      if (this.rightReport === null) {
        this.rightReport = new StarshipEnterprise(officerId, officerName, this);
      } else {
        this.rightReport.assignOfficer(officerId, officerName);
      }
    }
  }

  findOfficersWithNoDirectReports(values = []) {
    //the node where there are no children node
    if (!this.leftReport && !this.rightReport) {
      return values.push(this.officerName);
    }
    if (!this.leftReport) {
      return this.rightReport.findOfficersWithNoDirectReports(values);
    }
    if (!this.rightReport) {
      return this.leftReport.findOfficersWithNoDirectReports(values);
    }

    this.leftReport.findOfficersWithNoDirectReports(values);
    this.rightReport.findOfficersWithNoDirectReports(values);
    return values;
  }

  // inorder DFS
  listOfficersByExperience(officerNames = []) {
    // base case until reach null
    // go left recursively
    if (this.rightReport) {
      this.rightReport.listOfficersByExperience(officerNames);
    }
    // process after
    officerNames.push(this.officerName);
    // go right recursively
    if (this.leftReport) {
      this.leftReport.listOfficersByExperience(officerNames);
    }
    return officerNames;
  }

  //find by bfs
  //find the height of each node
  listOfficersByRank(tree, rankedOfficers = {}) {
    const queue = new Queue();
    queue.enqueue(tree);
    let node = queue.dequeue();

    //Create the first key-value of rank 1 : [officer]
    let rank = 1;
    rankedOfficers[rank] = [node.officerName];

    //Traverse to the next ones
    while (node) {
      //If the node has to report to a parent node and the rankedOfficers at that rank includes a matching name.
      //Then the node is a lower rank, so we do:
      if (
        node.reportTo &&
        rankedOfficers[rank].includes(node.reportTo.officerName)
      ) {
        //If the next rank level does not exist yet, we create the next rank level and add in the first officerName.
        //Else if the next rank level already exist, we add it in.
        if (rankedOfficers[rank + 1]) {
          rankedOfficers[rank + 1].push(node.officerName);
        } else {
          rankedOfficers[rank + 1] = [node.officerName];
        }
      }

      //If the node has a parent to report to but the parent node belongs to the next rank.
      //That means we have finished a rank level and the next rank will be the new base rank.
      //We +1 to set new base rank.
      //We create a key-value pair with the new rank.
      else if (
        node.reportTo &&
        rankedOfficers[rank + 1].includes(node.reportTo.officerName)
      ) {
        rank = rank + 1;
        rankedOfficers[rank + 1] = [node.officerName];
      }

      if (node.leftReport) {
        queue.enqueue(node.leftReport);
      }
      if (node.rightReport) {
        queue.enqueue(node.rightReport);
      }
      node = queue.dequeue();
    }
    return rankedOfficers;
  }
}

module.exports = StarshipEnterprise;

// Rank 1:                  10 Captain Picard
//                         /                  \
// Rank 2:        6 Commander Riker       11 Commander Data
//                    /         \               \
// Rank 3:       4 Lt. Cmdr.   7 Lt. Cmdr.     12 Lt. Cmdr.
//                Worf           LaForge           Crusher
//                     \                           \
// Rank 4:        5 Lieutenant                  13 Lieutenant
//               security-officer                    Selar
