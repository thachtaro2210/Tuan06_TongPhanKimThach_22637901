# Ứng Dụng Quản Lý Công Việc

Ứng dụng React Native để quản lý công việc với giao diện đẹp và tích hợp MockAPI.

## Tính năng

- ✅ **CRUD Operations**: Thêm, xem, chỉnh sửa và xóa công việc
- 🔍 **Tìm kiếm**: Tìm kiếm công việc theo tiêu đề và mô tả
- 🔄 **Đồng bộ dữ liệu**: Kết nối với MockAPI để lưu trữ dữ liệu
- 📱 **Giao diện đẹp**: UI/UX hiện đại và thân thiện
- 🔄 **Pull to Refresh**: Kéo để làm mới danh sách
- ⚡ **Loading States**: Hiển thị trạng thái tải và xử lý lỗi

## Cấu trúc dự án

```
├── app/
│   ├── index.tsx          # Màn hình chính (redirect)
│   ├── welcome.tsx       # Màn hình chào mừng
│   ├── tasks.tsx         # Danh sách công việc
│   ├── add-job.tsx       # Thêm/chỉnh sửa công việc
│   └── about.tsx         # Thông tin ứng dụng
├── services/
│   └── api.ts           # Service API để kết nối MockAPI
└── assets/
    └── images/          # Hình ảnh và icon
```

## API Endpoints

Ứng dụng sử dụng MockAPI tại: `https://67c83bfc0acf98d0708585e6.mockapi.io/todo`

### Endpoints:
- `GET /todo` - Lấy danh sách tất cả công việc
- `POST /todo` - Tạo công việc mới
- `PUT /todo/:id` - Cập nhật công việc
- `DELETE /todo/:id` - Xóa công việc

## Cài đặt và chạy

1. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

2. **Chạy ứng dụng:**
   ```bash
   npm start
   ```

3. **Chạy trên thiết bị:**
   ```bash
   npm run android  # Android
   npm run ios      # iOS
   npm run web      # Web
   ```

## Cách sử dụng

1. **Bắt đầu**: Nhập tên của bạn ở màn hình chào mừng
2. **Xem công việc**: Danh sách công việc sẽ được tải từ API
3. **Thêm công việc**: Nhấn nút "+" để thêm công việc mới
4. **Chỉnh sửa**: Nhấn icon ✏️ để chỉnh sửa công việc
5. **Xóa**: Nhấn icon 🗑️ để xóa công việc
6. **Tìm kiếm**: Sử dụng thanh tìm kiếm để lọc công việc
7. **Làm mới**: Kéo xuống để làm mới danh sách

## Thông tin phát triển

- **Tác giả**: Tổng Phan Kim Thách
- **MSSV**: 22637901
- **Phiên bản**: 1.0.0
- **Framework**: React Native với Expo
- **API**: MockAPI

## Công nghệ sử dụng

- React Native
- Expo Router
- TypeScript
- MockAPI
- React Native Components (View, Text, FlatList, TextInput, Pressable, etc.)

## Tính năng nổi bật

- **Giao diện hiện đại**: Sử dụng shadow, border radius và màu sắc hài hòa
- **Responsive Design**: Tối ưu cho nhiều kích thước màn hình
- **Error Handling**: Xử lý lỗi và hiển thị thông báo phù hợp
- **Loading States**: Hiển thị trạng thái tải để cải thiện UX
- **Pull to Refresh**: Cho phép người dùng làm mới dữ liệu dễ dàng
- **Empty State**: Hiển thị thông báo khi không có dữ liệu