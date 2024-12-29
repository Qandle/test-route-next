import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = [
  {
    username: "user1",
    password: "123",
  }, // password: "password123"
  // เพิ่มผู้ใช้ตามต้องการ
];

const secretKey = process.env.JWT_SECRET_KEY || "your_secret_key"; // เปลี่ยนเป็นคีย์ที่ปลอดภัย

export async function POST(req) {
  try {
    const { username, password } = await req.json();
    console.log(username, password);
    // ค้นหาผู้ใช้ในระบบ
    const user = users.find((user) => user.username === username);
    console.log('test', user);
    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 401,
      });
    }

    // ตรวจสอบรหัสผ่าน
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return new Response(JSON.stringify({ error: "Invalid password" }), {
    //     status: 401,
    //   });
    // }

    // สร้าง JWT
    const token = jwt.sign({ username: user.username }, secretKey, {
      expiresIn: "1h",
    });

    // ส่ง token กลับไป
    return new Response(JSON.stringify({ token }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}