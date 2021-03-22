import { getManager } from "typeorm";
import { Exam } from "../../models/actions/Exam";

export default {
    async getNextByStudentId(studentId: number): Promise<Exam[]> {
        const manager = getManager();

        return manager.query(`
            select mt.name, mte.description, mte.date, mte.statement_url
            from student st
            join student_matter stm on st.student_id = stm.student_id
            join matter mt on stm.matter_id = mt.matter_id
            join matter_exam mte on stm.matter_id = mte.matter_id
            where st.student_id = $1
            and mte.date >= now()
            order by mte.date asc;
            `, [studentId]);
    },

    async getPrevByStudentId(studentId: number): Promise<Exam[]> {
        const manager = getManager();

        return manager.query(`
            select mt.name, mte.description, mte.date, mte.statement_url
            from student st
            join student_matter stm on st.student_id = stm.student_id
            join matter mt on stm.matter_id = mt.matter_id
            join matter_exam mte on stm.matter_id = mte.matter_id
            where st.student_id = $1
            and mte.date < now()
            order by mte.date asc;
            `, [studentId]);
    }
}