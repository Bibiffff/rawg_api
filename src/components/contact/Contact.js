const Contact = () => {
    return (
        <section className="mt-3">
            <h1>Contact Use</h1>
            <p>Feel free to get in touch with us.</p>

            <form>
                <div className="mb-3">
                    <label for=""name className="form-label">Your Name</label>
                    <input type="text" className="form-control" id="name" placeholder="John Doe" required />
                </div>
                <div className="mb-3">
                    <label for="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email" placeholder="you@example.com" required />
                </div>
                <div className="mb-3">
                    <label for="message" className="form-label" >Message</label>
                    <textarea className="form-control" id="message" row="5" required ></textarea>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </section>
    );
};

export default Contact;