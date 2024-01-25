class Matrix {
  x;
  y;
  z;
  matrix;
    /** 
   *@param {Object} position - a object
    @param {number} position.x - x axis
     @param {number} position.y - y axis
      @param {number} [position.z] - z axis
   *
   */
  constructor(a) {
    if (a === undefined) {
    this.matrix = {}
    return this
    }
    const {x,y,z} = a
    this.x = x;
    this.y = y;
    if (z) this.z = z;

    const axis = {
      x,
      y,
      ...(z ? { z: z } : null),
    };
    this.matrix = { axis };
  }
  solid() {
    const twoD = Array(this.matrix.axis.y).fill(
      Array(this.matrix.axis.x).fill([]),
    );
    const threeD = Array(this.matrix.axis.z).fill(
      Array(this.matrix.axis.y).fill(Array(this.matrix.axis.x).fill([])),
    );
    this.matrix.body = !this.z ? twoD : threeD;
    return this;
  }
  /** 
   * @param {number} value - number used to fill
   *@param {Object} position - axis object
    @param {number} position.x - x axis
     @param {number} position.y - y axis
      @param {number} [position.z] - z axis
   *
   */
  fill(position, value) {
    if (
      position.x - this.matrix.axis.x > 0 ||
      position.y - this.matrix.axis.y > 0 ||
      position.z - this.matrix.axis.z > 0
    ) {
      throw new Error('position unavailable');
    }
    const deepClone = (arr) => JSON.parse(JSON.stringify(arr));

    // Clonar la matriz de manera profunda
    const draft = deepClone(this.matrix.body);
    if ('z' in position) {
    
   // Verificar que la posición sea válida para el eje z
        if (position.z > draft[0][0].length || position.z <= 0) {
            throw new Error('Invalid position for z axis');
        }

        draft[position.y - 1][position.x - 1][position.z - 1] = [value];

        const clone = structuredClone(draft);
        this.matrix.body = clone

      return this;
    } else {
        draft[position.y-1][position.x-1] = [value]
  
      
      this.matrix.body[position.y - 1] = draft[position.y-1]
      return this;
    }
  }
  print() {
    return this.matrix.body;
  }
  create(matrix) {
  if (typeof matrix !== 'object') {
    throw new Error('parameter must be a matrix');
  }

  const first_axis = matrix.length;
  const second_axis = matrix[0].length;
  const third_axis = matrix[0][0].length;
   
       const first_validation = matrix.every((x) => x.length === second_axis )
      const second_validation = matrix.every((x) => {
        return x.every((z) => z.length === third_axis )
      })
   

  if (!first_validation && !second_validation) {
    throw new Error('all elements must have same length');
  }
  const is3D = typeof matrix[0][0][0]?.length !== undefined;

  const axis = {
    y: first_axis,
    x: second_axis,
    ...(is3D ? { z: third_axis } : null),
  };
    this.matrix.axis = axis;
    this.matrix.body = matrix;
    return this
}
  
}

export default Matrix