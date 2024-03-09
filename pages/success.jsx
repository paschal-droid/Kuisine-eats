import Link from "next/link";

export default function Success() {

    return (
        <>
            <h1>Success Your order is now on the way</h1>
            <Link href={`./`}>Click here to go home </Link>
        </>
    )
}
