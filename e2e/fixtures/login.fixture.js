import { test as base } from '@playwright/test';

// Giả lập login API với JSONPlaceholder
export const test = base.extend({
  loginState: async ({ page }, use) => {
    // Giả lập API login thành công
    const token = 'dummyToken'; // Đây là token giả để bạn thực hành

    // Sử dụng token để truy cập thông tin người dùng (dùng GET request)
    await page.route('/users/1', route =>
      route.fulfill({
        status: 200,
        body: JSON.stringify({
          id: 1,
          name: 'Leanne Graham',
          username: 'Bret',
          email: 'Sincere@april.biz',
        }),
      })
    );

    // Giả lập trang đã đăng nhập và lấy thông tin người dùng (sử dụng GET request)
    await page.goto('/users/1');
    const userInfo = await page.evaluate(() => {
      return document.body.innerText; // Trả về text trên trang
    });

    // Giả lập đã đăng nhập thành công
    console.log('User Info:', userInfo);

    // Trả lại trang đã login giả lập
    await use(page);
  },
});
