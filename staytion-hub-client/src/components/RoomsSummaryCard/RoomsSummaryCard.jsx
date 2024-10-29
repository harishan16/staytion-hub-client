import './RoomsSummaryCard.scss';
import Card from '../Card/Card';

function RoomsSummaryCard ({roomsList}) {
    const occupiedRooms = roomsList.filter((room) => { return room.status === 'Occupied'})
    const occupancyRate = Math.round(occupiedRooms.length/roomsList.length * 100);

    return (
      <>
        <Card title="Total Rooms" value={roomsList? roomsList.length : ''}/>
        <Card title="Occupancy Rate" value={`${occupancyRate}%`}/>
      </>
    );
}

export default RoomsSummaryCard;