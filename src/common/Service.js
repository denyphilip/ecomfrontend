import axios from 'axios';
import { MAIN_URL } from '@/common/Url';
export function userLogin(data)
{
    return axios.post(`${MAIN_URL}login`,data)
}
export function userRegister(data)
{
    return axios.post(`${MAIN_URL}register`,data)
}
export function userContact(data)
{
    return axios.post(`${MAIN_URL}contact`,data)
}
export function banner()
{
    return axios.get(`${MAIN_URL}banner`)
}
export function category()
{
    return axios.get(`${MAIN_URL}category`)
}
export function categorybyid(id)
{
    return axios.get(`${MAIN_URL}category/${id}`)
}
export function product()
{
    return axios.get(`${MAIN_URL}product`)
}
export function productDetails(id)
{
    return axios.get(`${MAIN_URL}productdetails/${id}`)
}
export function profile()
{
    var token = localStorage.getItem('token');
    return axios.get(`${MAIN_URL}profile`, { headers: { "Authorization": `Bearer ${token}` } })
}
export function Updateprofile(data)
{
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}editprofile`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function changePassword(data)
{
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}changepass`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function coupon(code)
{
    return axios.get(`${MAIN_URL}coupon/${code}`)
}
export function cms()
{
    return axios.get(`${MAIN_URL}cms`)
}
export function cmsById(id)
{
    return axios.get(`${MAIN_URL}cms/${id}`)
}
export function wishlist(data) {
    return axios.post(`${MAIN_URL}wishlist`, data);
}
export function getWishlist(id) {
    return axios.get(`${MAIN_URL}wishlist/${id}`);
}
export function deletewishlist(id) {
    return axios.delete(`${MAIN_URL}wishlist/${id}`);
}
export function userAddress(data)
{
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}useraddress`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function order(data)
{
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}order`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function orderProduct(data)
{
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}orderproduct`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function usedCoupon(data)
{
    var token = localStorage.getItem('token');
    return axios.post(`${MAIN_URL}usedcoupon`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function orderDetails(id)
{
    var token = localStorage.getItem('token');
    return axios.get(`${MAIN_URL}orderdetails/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
}

export default {userLogin,userRegister,userContact,banner,category,categorybyid,product,productDetails,coupon,
    profile,Updateprofile,changePassword,cms,cmsById,wishlist,getWishlist,deletewishlist,
    userAddress,order,orderProduct,usedCoupon,orderDetails
};