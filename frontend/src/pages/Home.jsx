import {Link} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getAllTickets, reset } from "../features/tickets/ticketSlice";
import {FaQuestionCircle, FaTicketAlt} from 'react-icons/fa';
import TicketItem from "../components/TicketItem";

const Home = () => {

  const {user} = useSelector((state) => state.auth);
  const [checkAdmin, setCheckAdmin] = useState(false);
  const {tickets, isSuccess} = useSelector((state) => state.tickets);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
     if(isSuccess){
       dispatch(reset())
     }
    }
  }, [dispatch, isSuccess]);

  useEffect(() => {
    const checkForAdmin = () => {
      if(user){
        if(user.isAdmin){
          setCheckAdmin(true);
        }else{
          setCheckAdmin(false);
        }
      }else{
        setCheckAdmin(false);
      }
    }

    checkForAdmin();

    dispatch(getAllTickets());
  }, [dispatch]);


  return (
    <>
      {
        (checkAdmin) ? (
          <>
            <section className="heading">
              <h1>Welcome Admin!</h1>
              <p>Please check the tickets bellow</p>
            </section>

            <h1>Tickets</h1>
            <div className="tickets">
              <div className="ticket-headings">
                <div>Date</div>
                <div>Product</div>
                <div>Status</div>
                <div></div>
              </div>
              {tickets.map((ticket) => (
              <TicketItem key={ticket._id} ticket={ticket} />
              ))}
            </div>
          </>
        ) : (
          <>
            <section className="heading">
              <h1>What do you need help with?</h1>
              <p>Please choose from an option bellow</p>
            </section>

            <Link to='/new-ticket' className='btn btn-reverse btn-block'>
              <FaQuestionCircle /> Create New Ticket
            </Link>
            <Link to='/tickets' className='btn btn-block'>
              <FaTicketAlt /> View My Tickets
            </Link>
          </>
        )
      }
    </>
  )
}

export default Home