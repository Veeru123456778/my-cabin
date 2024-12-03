import * as THREE from 'three';

// Function to create the cuboid structure with shelves
export function createShelfStructure() {
    const shelfStructureGroup = new THREE.Group();

    // Material for the structure
    const structureMaterial = new THREE.MeshStandardMaterial({
        color: 0x7f7f7f,  // Light grey for the body
        roughness: 0.8,
    });

    // Load texture for the front face (greenShelf.jpg)
    const shelfTexture = new THREE.TextureLoader().load('/greenShelf.jpg');
    const dimColor = new THREE.Color(0.5, 0.5, 0.5);  // Dimming the texture to a grey tone

    const frontMaterial = new THREE.MeshStandardMaterial({
        map: shelfTexture,
        roughness: 0.8,
        color:dimColor
    });

    // Dimensions of the cuboid shelf structure
    const structureWidth = 2.7;
    const structureHeight = 8;
    const structureDepth = 1.5;

    // Create the main body of the structure (cuboid)
    const structureBody = new THREE.Mesh(
        new THREE.BoxGeometry(structureWidth, structureHeight, structureDepth),
        structureMaterial
    );
    shelfStructureGroup.add(structureBody);

    // Create front face with green shelf texture
    const structureFront = new THREE.Mesh(
        new THREE.PlaneGeometry(structureWidth, structureHeight),
        frontMaterial
    );
    structureFront.position.z = structureDepth / 2 + 0.01; // Slight offset to prevent z-fighting
    shelfStructureGroup.add(structureFront);

    // Create shelves inside the structure (as cuboids)
    const shelfMaterial = new THREE.MeshStandardMaterial({ color: 0x7f7f7f, roughness: 0.8 });
    const numberOfShelves = 6;  // Add more shelves if needed
    const shelfSpacing = structureHeight / (numberOfShelves + 1); // Evenly spaced shelves
    
    for (let i = 1; i <= numberOfShelves; i++) {
        const shelf = new THREE.Mesh(
            new THREE.BoxGeometry(structureWidth * 0.9, 0.2, structureDepth * 0.9), // Shelf geometry
            shelfMaterial
        );
        shelf.position.set(0, i * shelfSpacing - structureHeight / 2, 0);
        shelfStructureGroup.add(shelf);
    }

    return shelfStructureGroup;
}
