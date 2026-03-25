import { getMyEnrollments } from "@/entities/course";
import MyPage from "@/page/my-page";
import { getUser } from "@/shared/api";
import { cookies } from "next/headers";

export default async function MyPageRoute() {
    const cookie = await cookies();
    const accessToken = cookie.get("accessToken")?.value;

    const user = await getUser({ accessToken });

    const enrollments = await getMyEnrollments(accessToken);
    return <MyPage enrollments={enrollments} user={user} />;
}
