import address from '../models/addressModel.js';
import StatusCodes from 'http-status-codes';

export const createAddress = async (req, res) => {
  try {
    const userId = req.user.userId;
console.log(userId, 'userID is unlock')
    const {
      doorNo,
      street,
      landmark,
      city,
      state,
      pinCode,
      mobileNo,
      addressType,
      altNo,
    } = req.body;

    // const userId = req.user.userId;

    // Validation
    if (!doorNo || !street || !city || !state || !pinCode || !mobileNo) {
      return res.status(400).json({
        success: false,
        message: "All required address fields must be entered",
      });
    }

    const createdAddress = await address.create({
        user: userId, doorNo, street, landmark, city, state, pinCode, mobileNo, addressType: addressType || 'Home', altNo
    })

    return res.status(StatusCodes.CREATED).json({success: true, message: "Address details created successfully", createdAddress})
   
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error: error.message });
  }
};

export const getAddress = async(req, res) =>{
    try {
        const userId = req.user.userId;

        const isAvailable = await address.find({user: userId})
        if(!isAvailable) return res.status(StatusCodes.BAD_REQUEST).json({success:false, error: 'user not found'});

        return res.status(StatusCodes.OK).json(isAvailable);
    } catch (error) {
        return res.status(400).json({success: false, error: error.message})
    }
}