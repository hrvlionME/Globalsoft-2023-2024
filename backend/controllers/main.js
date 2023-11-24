import * as db from '../config/db.js';

export const rootEndpoint = async (req,res) => {
    const data = await db.getInfo();
    res.json(data);
}

export const createNewGroupChat = async (req,res) => {
    const usersIds = [...req.body.participants];
    const name = req.body.name;
    const isSuccess = await db.insertNewGroupChatData(usersIds, name);
    if(isSuccess) return res.status(200).json({message: 'Groupchat created successfully'});
    return res.status(500).json({message: 'Error occured'});
}

export const login = async (req, res) =>{
  const {email, password} = req.body

  if (email && password) {
    const isSuccess = await db.checkData(email, password);

    if(isSuccess)
    {
      if(data.length > 0)
      {
        const userId = data[0].ID;
        return res.status(200).json({Status: "Success", ID : userId});
      }
      else{
        return res.status(401).json({Status: "Incorrect credentials"});
      }
    }
  }else {
		response.send('Please enter Email and Password!');
		response.end();
	}
}