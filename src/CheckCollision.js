function CheckCollision(objectA, objectB) {
    if (
    objectA.x < objectB.x + objectB.width &&
    objectA.x + objectA.width > objectB.x &&
    objectA.y < objectB.y + objectB.height &&
    objectA.y + objectA.height > objectB.y
  ) {
    return true;
  }

  return false;
}

export default CheckCollision;
