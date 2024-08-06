function getBatchesAndPrograms(courseOfferings) {
  let uniqueBatchesAndPrograms = new Map();

  for (const courseOffering of courseOfferings) {
    
    for (const taker of courseOffering.takers) {
      const batch = taker.batch;
      const programCode = taker.programCode;
      const programName = taker.programName;
      const program = `${programCode} - ${programName}`;
  
      if (!uniqueBatchesAndPrograms.has(batch))
        uniqueBatchesAndPrograms.set(batch, new Set()); // Initialize a Set for unique programs
  
      uniqueBatchesAndPrograms.get(batch).add(program); 
    }
  };

  uniqueBatchesAndPrograms = Array.from(uniqueBatchesAndPrograms); // Convert map to arrays to make it iterable
  uniqueBatchesAndPrograms = uniqueBatchesAndPrograms.map(([batch, programs]) => [batch, Array.from(programs)]); // Convert set elements into array
  uniqueBatchesAndPrograms = uniqueBatchesAndPrograms.sort(([batchA], [batchB]) => batchB - batchA); // Sort the entries in descending order based on the batch number
  uniqueBatchesAndPrograms = Object.fromEntries(uniqueBatchesAndPrograms); // Convert map into object

  return uniqueBatchesAndPrograms;
}


module.exports = getBatchesAndPrograms;
