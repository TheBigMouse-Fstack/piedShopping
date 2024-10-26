//file này lưu các request mà người dùng gửi lên
export interface RegisterReqbody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: Date
}
