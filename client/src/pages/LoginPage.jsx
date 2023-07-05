import { Link } from "react-router-dom"
export default function LoginPage(){
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mt-48">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto">
                    <input type="email"
                        placeholder="your@email.com"/>
                    <input type="password"
                        placeholder="password"/>
                    <button className="primary">Login</button>
                    <div className="text-center text-black-500 py-2">
                        Don't have an account yet? <Link to={'/register'} className="underline text-primary"> Register Now</Link>
                    </div>
                </form>
            </div>
      </div>
    )
}