import styles from './LoginPage.module.css'

function LoginPage() {

    return(
            <div className={styles.container}>
                <div className={styles.welcomeSection}>
                    <h1>Hello, </h1>
                    <h1>welcome!</h1>
                    <form className={styles.loginForm}>
                        <label for="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email address" required/>
                        <label for="password">Password</label>
                        <input type="password" id="password" placeholder="Enter your password" required/>
                        <button type="submit">Log In</button>
                    </form>
                </div>
                <div className={styles.imageSection}>
                    
                </div>
            </div>
    );

}

export default LoginPage