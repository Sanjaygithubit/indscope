function Footer() {
  return (
    <footer className="bg-black text-white text-center py-6 mt-20">
      <p className="text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-primary font-semibold">
          FASHIONX
        </span>
        . All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
