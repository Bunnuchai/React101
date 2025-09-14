import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema สำหรับตรวจสอบข้อมูล
const MemberSchema = z.object({
  prefix: z.string().min(1, "กรุณาเลือกคำนำหน้า"),
  firstName: z.string().min(1, "กรุณากรอกชื่อ"),
  lastName: z.string().min(1, "กรุณากรอกนามสกุล"),
  photo: z.custom<FileList>((v) => v instanceof FileList && v.length > 0, {
    message: "กรุณาอัปโหลดรูปถ่าย 2 นิ้ว",
  }),
  workHistory: z.string().optional(),
  achievements: z.string().optional(),
  position: z.string().optional(),
  ministry: z.string().optional(),
  party: z.string().optional(),
});

type Member = z.infer<typeof MemberSchema> & {
  photoUrl?: string;
};

export default function ParliamentForm() {
  const [members, setMembers] = useState<Member[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const photoRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Member>({
    resolver: zodResolver(MemberSchema),
  });

  const onSubmit = (data: Member) => {
    const photoUrl = previewUrl;
    const memberWithPhoto = { ...data, photoUrl };

    if (editIndex !== null) {
      const updated = [...members];
      updated[editIndex] = memberWithPhoto;
      setMembers(updated);
      setEditIndex(null);
    } else {
      setMembers((prev) => [...prev, memberWithPhoto]);
    }

    reset();
    setPreviewUrl(null);
    if (photoRef.current) photoRef.current.value = "";
  };

  const onEdit = (index: number) => {
    const member = members[index];
    Object.entries(member).forEach(([key, value]) => {
      if (key !== "photoUrl") {
        setValue(key as keyof Member, value);
      }
    });
    setEditIndex(index);
    setPreviewUrl(member.photoUrl || null);
  };

  const onDelete = (index: number) => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสมาชิกนี้?")) {
      setMembers((prev) => prev.filter((_, i) => i !== index));
      if (editIndex === index) {
        reset();
        setEditIndex(null);
        setPreviewUrl(null);
      }
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-black overflow-auto">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-4xl p-6 bg-white shadow-xl rounded-xl border border-indigo-200 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">ลงทะเบียนสมาชิกสภาผู้แทนราษฎร</h1>

          {editIndex !== null && (
            <div className="font-medium mb-4 text-center">✏️ กำลังแก้ไขข้อมูลสมาชิก...</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <select {...register("prefix")} className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500">
              <option value="">เลือกคำนำหน้า</option>
              <option value="นาย">นาย</option>
              <option value="นาง">นาง</option>
              <option value="นางสาว">นางสาว</option>
            </select>
            {errors.prefix && <p className="text-red-500">{errors.prefix.message}</p>}

            <input
              placeholder="ชื่อ"
              {...register("firstName")}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
            />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}

            <input
              placeholder="นามสกุล"
              {...register("lastName")}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
            />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}

            <input
              type="file"
              {...register("photo")}
              onChange={handlePhotoChange}
              ref={photoRef}
              className="w-full"
            />
            {errors.photo && <p className="text-red-500">{errors.photo.message}</p>}
            {previewUrl && (
              <img
                src={previewUrl}
                alt="รูปถ่าย 2 นิ้ว"
                className="w-24 h-24 object-cover rounded mt-2 border"
              />
            )}

            <textarea
              placeholder="ประวัติการทำงาน"
              {...register("workHistory")}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <textarea
              placeholder="ผลงานที่ผ่านมา"
              {...register("achievements")}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              placeholder="ตำแหน่งรัฐมนตรี"
              {...register("position")}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              placeholder="กระทรวง"
              {...register("ministry")}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <input
              placeholder="สังกัดพรรคการเมือง"
              {...register("party")}
              className="w-full border p-2 rounded focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="submit"
              className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded shadow hover:from-indigo-600 hover:to-blue-600 transition"
            >
              {editIndex !== null ? "📝 แก้ไขข้อมูล" : "➕ เพิ่มสมาชิก"}
            </button>
          </form>

          <hr className="my-6 border-indigo-300" />

          <h2 className="text-xl font-semibold mb-4">📋 รายชื่อสมาชิก</h2>
          {members.length === 0 ? (
            <p>ยังไม่มีข้อมูลสมาชิก</p>
          ) : (
            <ul className="space-y-4">
              {members.map((m, idx) => (
                <li key={idx} className="border p-4 rounded-lg bg-indigo-50 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold">
                        {m.prefix} {m.firstName} {m.lastName}
                      </h3>
                      <p>ตำแหน่ง: {m.position || "-"}</p>
                      <p>กระทรวง: {m.ministry || "-"}</p>
                      <p>พรรค: {m.party || "-"}</p>
                      {m.photoUrl && (
                        <img
                          src={m.photoUrl}
                          alt="รูปถ่ายสมาชิก"
                          className="w-16 h-16 object-cover rounded mt-2 border"
                        />
                      )}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onEdit(idx)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => onDelete(idx)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        ลบ
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}