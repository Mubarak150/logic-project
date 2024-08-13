const GoodsReceived = require('../models/GoodsReceived');
const Consignment = require('../models/Consignment');
const {handleDeleteById, handleUpdateById} = require('../utils/functions')
const ConsignmentItem = require('../models/ConsignmentItem');
const Item = require('../models/Item');

const createGoodsReceived = async (req, res) => {
  const data = req.body; // the front end dev must pass the consignment id of the selected consignment, warehouseId of user along with all the fields input of goods_received table. 

  try {
    const newGoodsReceived = await GoodsReceived.create({
      ...data
    });

    res.status(201).json(newGoodsReceived);
  } catch (error) {
    console.error('Error creating goods received:', error);
    res.status(500).json({ error: 'Failed to create goods received' });
  }
};

const getAllGoodsReceived = async (req, res) => { // via this... sending the data of all the goods_recieved and the data of thier relative consignments. this is an array. 
    try {
      const goodsReceivedData = await GoodsReceived.findAll({
        include: [
          {
            model: Consignment,
            attributes: ['id', 'documentNumber', 'country', 'project', 'finalDestination', 'from', 'transportType', 'vehicle', 'refDocType', 'refDocNumber',  'warehouseId'],
            // include: [
            //   {
            //     model: ConsignmentItem,
            //     attributes: ['id'],
            //     include: [
            //       {
            //         model: Item,
            //         attributes: ['id', 'itemCode', 'itemGroup']
            //       }
            //     ]
            //   }
            // ]
          }
        ]
      });
  
      res.status(200).json(goodsReceivedData);
    } catch (error) {
      console.error('Error fetching goods received:', error);
      res.status(500).json({ error: 'Failed to fetch goods received' });
    }
  };

const deleteGoodsReceivedById = handleDeleteById(GoodsReceived);

const updateGoodsReceivedById = handleUpdateById(GoodsReceived);
  

module.exports = {createGoodsReceived, getAllGoodsReceived, deleteGoodsReceivedById, updateGoodsReceivedById }; 


// for front end dev: 
// the result of all goods-received: 
// [
//     {
//         "id": 2,
//         "consignmentId": 4,
//         "deliveredBy": "John Doe",
//         "deliveredByDate": "2024-08-08T00:00:00.000Z",
//         "deliveredByFunction": "Delivery Driver",
//         "deliveredByCondition": "good",
//         "receivedBy": "Jane Smith",
//         "receivedByDate": "2024-08-08T00:00:00.000Z",
//         "receivedByFunction": "Warehouse Manager",
//         "receivedByCondition": "good",
//         "createdAt": "2024-08-08T14:57:09.000Z",
//         "updatedAt": "2024-08-08T14:57:09.000Z",
//         "Consignment": {
//             "id": 4,
//             "documentNumber": "DOC1234997",
//             "country": "Canada",
//             "project": "Project Beta",
//             "finalDestination": "Toronto",
//             "from": "Vancouver",
//             "transportType": "Sea",
//             "vehicle": "Cargo Ship",
//             "refDocType": "B/L",
//             "refDocNumber": "BL98765",
//             "warehouseId": 2
//         }
//     }
// ]