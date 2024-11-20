import Student from '../models/student.model.js';
import Token from '../models/token.model.js';
import moment from 'moment';
import 'moment/locale/vi.js'; // Đảm bảo đường dẫn đúng
moment.locale('vi');

export const getInfo = async (req, res) => {
  const student = await Student.findOne({ _id: req.user._id });
  res.status(200).json(student);
};

export const changePassword = async (req, res) => {};

export const updateProfile = async (req, res) => {
  try {
    const info = req.body;
    const student = await Student.findOneAndUpdate({ _id: req.user._id }, info, { new: true });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const getLoginTime = async (req, res) => {
  try {
    // Tìm tất cả các token có user giống với req.user._id
    const tokens = await Token.find({ user: req.user._id });

    // Lấy ra thông tin createdAt của mỗi token và định dạng lại
    const LoginList = tokens.map((token) =>
      moment(token.createdAt).format('HH[h]mm dddd, [ngày] DD [tháng] MM [năm] YYYY')
    );

    // Trả về danh sách các createdAt đã định dạng
    res.status(200).json({ LoginList });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
