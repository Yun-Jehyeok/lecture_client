import { getMyEnrollmentsServer } from "@/entities/course/api/courseApiServer";
import MyPage from "@/page/my-page";
import { getUserServer } from "@/shared/api/auth/getUserServer";
import { cookies } from "next/headers";

export default async function MyPageRoute() {
    const cookie = await cookies();
    const accessToken = cookie.get("accessToken")?.value;

    const user = await getUserServer({ accessToken });

    const enrollments = await getMyEnrollmentsServer(accessToken);
    return <MyPage enrollments={enrollments} user={user} />;
}
