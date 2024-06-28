import { useNavigate, useParams } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export default function Contact() {
    const navigate = useNavigate();
    const params = useParams();
    const contactId = params.contactId;

    const [contact, setContact] = React.useState();

    React.useEffect(() => {
        getContact(contactId).then(setContact);
    }, [contactId]);

    const handleEdit = () => {
        navigate(`/contacts/${contactId}/edit`);
    };

    const handleDelete = async (event) => {
        event.preventDefault();
        if (confirm("Please confirm you want to delete this record.")) {
            await deleteContact(contactId);
            navigate("/contacts");
        }
    };

    const toggleFavorite = async (event) => {
        event.preventDefault();
        const newFavorite = !contact.favorite;
        const updates = { favorite: newFavorite };
        await updateContact(contactId, updates);
        setContact({ ...contact, ...updates });
    };

    return (
        <div id="contact">
            <div>
                <img
                    key={contact?.avatar}
                    src={
                        contact?.avatar ||
                        `https://robohash.org/${contactId}.png?size=200x200`
                    }
                />
            </div>

            <div>
                <h1>
                    {contact?.first || contact?.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <button onClick={toggleFavorite}>
                        {contact?.favorite ? "★" : "☆"}
                    </button>
                </h1>

                {contact?.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact?.notes && <p>{contact.notes}</p>}

                <div>
                    <button onClick={handleEdit}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
}

