import { NextResponse } from 'next/server';
import { getProfile } from './utils/utils';
import { url } from 'inspector';

export const middleware = async (request) => {
    const pathname = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value;
    // console.log(token);

    // Kiểm tra nếu không có token và người dùng không đang ở trang login
    if (!token && pathname !== "/login") {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // Nếu có token, xác thực token
    if (pathname==="/login") {
        if (token) {
            const { success, user } = await getProfile(token);
            // console.log("Profile fetched:", { success, user });
            // Nếu token không hợp lệ, chuyển hướng về trang login
            if (!success) {
                return NextResponse.redirect(new URL("/login", request.url));
            }
            else if (success) {
                return NextResponse.redirect(new URL("/", request.url));

            }
        }
    }

    // Tiếp tục với request nếu không có vấn đề gì
    return NextResponse.next();
};

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};