// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Tính năng mới
        'fix', // Sửa lỗi
        'docs', // Cập nhật tài liệu
        'style', // Thay đổi định dạng code
        'refactor', // Tái cấu trúc code
        'test', // Thêm/sửa test
        'chore' // Các thay đổi khác
      ]
    ],
    'subject-max-length': [2, 'always', 72] // Giới hạn độ dài message
  }
}
