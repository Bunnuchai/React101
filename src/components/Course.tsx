// Todolist.tsx
import { useState } from "react";

function TodoApp() {
    type Course = {
        subject: string;
        grade: string;
    };

    const [subject, setSubject] = useState<string>("");   
    const [grade, setGrade] = useState<string>("");       
    const [courses, setCourses] = useState<Course[]>([]); 
    const [gpa, setGpa] = useState<number | null>(null);  

    const addCourse = () => {
        if (subject.trim() === "" || grade.trim() === "") return;
        setCourses([...courses, { subject, grade }]);
        setSubject("");
        setGrade("");
        setGpa(null); // รีเซ็ตค่า GPA เวลามีการเพิ่มใหม่
    };

    const deleteCourse = (index: number) => {
        const newCourses = courses.filter((_, i) => i !== index);
        setCourses(newCourses);
        setGpa(null); // รีเซ็ตค่า GPA เวลามีการลบ
    };

    // แปลงเกรดเป็นตัวเลข
    const gradeToPoint = (grade: string): number | null => {
        switch (grade) {
            case "A": return 4.0;
            case "B+": return 3.5;
            case "B": return 3.0;
            case "C+": return 2.5;
            case "C": return 2.0;
            case "D+": return 1.5;
            case "D": return 1.0;
            case "F": return 0.0;
            case "W": return null; // ไม่เอามาคิด
            default: return null;
        }
    };

    const calculateGPA = () => {
        const points = courses
            .map(c => gradeToPoint(c.grade))
            .filter(p => p !== null) as number[];

        if (points.length === 0) {
            setGpa(0);
            return;
        }

        const sum = points.reduce((a, b) => a + b, 0);
        setGpa(sum / points.length);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>My Course</h1>
            <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="รายชื่อวิชา"
            />
            <select
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
            >
                <option value="">-- เลือกเกรด --</option>
                <option value="A">A</option>
                <option value="B+">B+</option>
                <option value="B">B</option>
                <option value="C+">C+</option>
                <option value="C">C</option>
                <option value="D+">D+</option>
                <option value="D">D</option>
                <option value="F">F</option>
                <option value="W">W</option>
            </select>
            <button onClick={addCourse}>เพิ่ม</button>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {courses.map((c, index) => (
                    <li 
                        key={index} 
                        style={{ 
                            margin: "5px 0", 
                            color: c.grade === "F" ? "red" : "black" 
                        }}
                    >
                        {c.subject} - {c.grade}
                        <button
                            onClick={() => deleteCourse(index)}
                            style={{ marginLeft: 10, color: "red" }}
                        >
                            ลบ
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={calculateGPA} style={{ marginTop: 20 }}>
                คำนวณ GPA
            </button>

            {gpa !== null && (
                <h2 style={{ marginTop: 20 }}>
                    GPA: {gpa.toFixed(2)}
                </h2>
            )}
        </div>
    );
}

export default TodoApp;

