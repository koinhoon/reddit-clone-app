import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { FormEvent, useState } from 'react'
import InputGroup from '../components/inputGroup';
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState<any>({});
    
    let router = useRouter();

    const handleSubmit = async (event :FormEvent) => {
        event.preventDefault();

        try {
            const res = await axios.post('/auth/register', {
                email,
                password,
                username
            })
            console.log(res, res);
            //router.push("/login")

        } catch(e : any) {
            console.error(e);
            setErrors(e.response?.data || {});
        }
    }


    return (
        <div className="bg-white">
			<div className="flex flex-col items-center justify-center h-screen p-6">
				<div className="w-10/12 mx-auto md:w-96">
					<h1 className="mb-2 text-lg font-medium">회원가입</h1>
					<form onSubmit={handleSubmit} >
                        <InputGroup
                            placeholder="Email"
                            value={email}
                            setValue={setEmail}
                            error={errors.email}
                        />
                        <InputGroup
                            placeholder="UserName"
                            value={username}
                            setValue={setUsername}
                            error={errors.username}
                        />
                        <InputGroup
                            placeholder="Password"
                            value={password}
                            setValue={setPassword}
                            error={errors.password}
                        />
						<button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border bordder-gray-400 rounded">회원가입</button>
					</form>
					<small>
						이미 가입하셨나요?
						<Link href="/login">
							<div className=" text-blue-500 uppercase">로그인</div>
                        </Link>
                    </small>
				</div>
			</div>
		</div>
    )
}

export default Register