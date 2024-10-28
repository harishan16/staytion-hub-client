import './RoomsSummaryCard.scss';

import Card from '../Card/Card';

function RoomsSummaryCard ({roomsList}) {
  console.log(roomsList);

      const occupiedRooms = roomsList.filter((room) => { return room.status === 'Occupied'})
      // console.log(occupiedRooms);

      const occupancyRate = Math.round(occupiedRooms.length/roomsList.length * 100);
      // console.log(occupancyRate);

    return (
      <>
        <Card title="Total Rooms" value={roomsList? roomsList.length : ''}/>
        <Card title="Occupancy Rate" value={`${occupancyRate}%`}/>
      </>

    );
}

export default RoomsSummaryCard;