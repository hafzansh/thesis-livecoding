import type { RequestHandler } from '@sveltejs/kit'

import cookie from 'cookie'
import { getAccessToken } from '../../lib/auth/login'

export const POST:RequestHandler = async ({ request }) => {
    const form = await request.formData()
    const username = form.get('username')
    const password = form.get('password')
    if (
        typeof username !== 'string' ||
        typeof password !== 'string'
    ) {
        return {
            status: 400,
            body: {
                error: 'Enter a valid username and password.',
            },
        }
    }

    if (!username || !password) {
        return {
            status: 400,
            body: {
                error: 'Username and password are required.',
            },
        }
    }
    const user = {
        username: username,
        password: password
    }
    const r = await getAccessToken(user).then(res => {return res?.json()})
    if (!r.access_token) {        
        return {
            status: 400,
            body: {
                error: r.detail
            }
        }
    }
    return {
        status: 200,
        body: {
            user: { username },
            success: 'Success.',
        },
        headers: {
            'Set-Cookie': cookie.serialize(
                "auth_token",
                r.access_token,
                {
                    path: '/',
                    httpOnly: true,                    
                    sameSite: 'strict',
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 60 * 60 * 24 * 30,
                }
            ),
        },
    }
}