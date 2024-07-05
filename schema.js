const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type rawdata {
    
        WetlandID : String!
        WetlandName: String!
        Area: String!
        DesignationDate: String!
        Latitude: String!
        Longitude: String!
        ManagementAuthority: String!
        MajorPlants: String!
        StateName: String!
        districtname: String!
        ramsar_sight: String!
        Uniqueness: String!
        WetlandType: String!
    
  }

  type Query {
 
    getRawdat(WetlandID: String!): rawdata
    getRawdata: [rawdata]
  }
  
`);

module.exports = schema;
