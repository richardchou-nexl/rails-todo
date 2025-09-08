# typed: strict

module Tables
  class ActiveRecordTableRows < T::Struct
    extend T::Sig
    include Tables::TableRows

    sig { override.returns(T::Array[TableRow]) }
    def entries
      binding.pry
    end

    sig { override.returns(Integer) }
    def total_count
      binding.pry
    end

    sig { override.returns(Integer) }
    def total_pages
      binding.pry
    end
  end
end
