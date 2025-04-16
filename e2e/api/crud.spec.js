const { test, expect, request } = require('@playwright/test');

test.describe('🧪 JSONPlaceholder API - Full CRUD Test', () => {
  let apiContext;

  test.beforeAll(async () => {
    apiContext = await request.newContext({
      baseURL: 'https://jsonplaceholder.typicode.com',
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
      },
    });
  });

  test('GET - Lấy thông tin user', async () => {
    const response = await apiContext.get('/users/1');
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toHaveProperty('id', 1);
    expect(data).toHaveProperty('username');
  });

  test('POST - Tạo post mới', async () => {
    const response = await apiContext.post('/posts', {
      data: {
        title: 'Playwright Test',
        body: 'Đây là nội dung bài post được tạo tự động.',
        userId: 1,
      },
    });

    expect(response.status()).toBe(201); // 201 Created
    const data = await response.json();
    expect(data).toHaveProperty('id'); // JSONPlaceholder giả lập, sẽ trả về id mới
    expect(data.title).toBe('Playwright Test');
  });

  test('PUT - Cập nhật post', async () => {
    const response = await apiContext.put('/posts/1', {
      data: {
        id: 1,
        title: 'Bài viết đã chỉnh sửa',
        body: 'Nội dung mới sau khi chỉnh sửa.',
        userId: 1,
      },
    });

    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data.title).toContain('chỉnh sửa');
  });

  test('DELETE - Xóa post', async () => {
    const response = await apiContext.delete('/posts/1');
    expect(response.status()).toBe(200); // JSONPlaceholder luôn trả về 200 nhưng không xoá thật
  });
});
