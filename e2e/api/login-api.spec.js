import { test, expect } from '@playwright/test';

test('Kiểm tra API đăng nhập và lấy thông tin người dùng', async ({ page }) => {
  // Gửi request đến API và lấy thông tin người dùng
  const response = await page.request.get('/users/1');
  const userInfo = await response.json(); // Lấy dữ liệu JSON từ phản hồi
  console.log(userInfo)
  // Kiểm tra nếu thông tin người dùng được trả về đúng
  expect(userInfo).toHaveProperty('name', 'Leanne Graham');
  expect(userInfo).toHaveProperty('username', 'Bret');
  expect(userInfo).toHaveProperty('email', 'Sincere@april.biz');
});